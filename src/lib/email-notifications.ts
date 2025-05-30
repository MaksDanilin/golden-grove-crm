import { supabase } from './supabase'

// Email notification types
export type NotificationType =
  | 'order_created'
  | 'order_status_updated'
  | 'follow_up_reminder'
  | 'new_communication'
  | 'lead_assigned'

// Email template configurations
const EMAIL_TEMPLATES = {
  order_created: {
    subject: '🎉 New Order Received - Golden Grove',
    template: 'order-created'
  },
  order_status_updated: {
    subject: '📦 Order Status Update - Golden Grove',
    template: 'order-status-updated'
  },
  follow_up_reminder: {
    subject: '⏰ Follow-up Reminder - Golden Grove CRM',
    template: 'follow-up-reminder'
  },
  new_communication: {
    subject: '💬 New Communication Logged - Golden Grove CRM',
    template: 'new-communication'
  },
  lead_assigned: {
    subject: '🎯 New Lead Assigned - Golden Grove CRM',
    template: 'lead-assigned'
  }
}

// Email notification data types
export interface OrderNotificationData {
  orderId: string
  distributorName: string
  productType: string
  quantity: number
  status: string
  orderDate: string
  assignedRep: string
  repEmail: string
  message?: string
}

export interface FollowUpReminderData {
  distributorName: string
  communicationType: string
  summary: string
  followUpDate: string
  assignedRep: string
  repEmail: string
  message?: string
}

export interface LeadAssignmentData {
  distributorName: string
  contactPerson: string
  region: string
  estimatedValue: number
  assignedRep: string
  repEmail: string
  message?: string
}

export interface CommunicationNotificationData {
  distributorName: string
  type: string
  summary: string
  date: string
  assignedRep?: string
  repEmail?: string
  message?: string
}

// Union type for all notification data types
export type NotificationData = 
  | OrderNotificationData 
  | FollowUpReminderData 
  | LeadAssignmentData 
  | CommunicationNotificationData

// Core notification function
export const sendNotification = async (
  type: NotificationType,
  data: NotificationData,
  recipients: string[]
) => {
  try {
    const { data: result, error } = await supabase.functions.invoke('send-email-notification', {
      body: {
        type,
        data,
        recipients,
        template: EMAIL_TEMPLATES[type]
      }
    })

    if (error) {
      console.error('Email notification error:', error)
      throw error
    }

    return result
  } catch (error) {
    console.error('Failed to send notification:', error)
    throw error
  }
}

// Specific notification functions
export const notifyOrderCreated = async (orderData: OrderNotificationData) => {
  const recipients = [orderData.repEmail, 'admin@goldengrove.com']

  return sendNotification('order_created', {
    ...orderData,
    message: `New order received from ${orderData.distributorName} for ${orderData.quantity} units of ${orderData.productType}.`
  }, recipients)
}

export const notifyOrderStatusUpdate = async (orderData: OrderNotificationData) => {
  const recipients = [orderData.repEmail]

  return sendNotification('order_status_updated', {
    ...orderData,
    message: `Order ${orderData.orderId} status updated to "${orderData.status}" for ${orderData.distributorName}.`
  }, recipients)
}

export const notifyFollowUpReminder = async (reminderData: FollowUpReminderData) => {
  const recipients = [reminderData.repEmail]

  return sendNotification('follow_up_reminder', {
    ...reminderData,
    message: `Follow-up reminder: ${reminderData.communicationType} with ${reminderData.distributorName} scheduled for ${reminderData.followUpDate}.`
  }, recipients)
}

export const notifyNewCommunication = async (communicationData: CommunicationNotificationData) => {
  const recipients = ['admin@goldengrove.com']

  return sendNotification('new_communication', {
    ...communicationData,
    message: `New ${communicationData.type} logged with ${communicationData.distributorName}.`
  }, recipients)
}

export const notifyLeadAssignment = async (leadData: LeadAssignmentData) => {
  const recipients = [leadData.repEmail, 'admin@goldengrove.com']

  return sendNotification('lead_assigned', {
    ...leadData,
    message: `New lead assigned: ${leadData.distributorName} in ${leadData.region} with estimated value of $${leadData.estimatedValue.toLocaleString()}.`
  }, recipients)
}

// Scheduled follow-up reminders
export const checkFollowUpReminders = async () => {
  try {
    const today = new Date().toISOString().split('T')[0]

    const { data: overdueReminders, error } = await supabase
      .from('communications')
      .select(`
        *,
        distributors!inner(company_name),
        users!inner(email, full_name)
      `)
      .eq('follow_up_date', today)
      .not('follow_up_date', 'is', null)

    if (error) throw error

    // Send reminder notifications
    for (const reminder of overdueReminders || []) {
      await notifyFollowUpReminder({
        distributorName: reminder.distributors.company_name,
        communicationType: reminder.type,
        summary: reminder.summary,
        followUpDate: reminder.follow_up_date,
        assignedRep: reminder.users.full_name,
        repEmail: reminder.users.email
      })
    }

    return { sent: overdueReminders?.length || 0 }
  } catch (error) {
    console.error('Error checking follow-up reminders:', error)
    throw error
  }
}

// Email templates (these would be stored in Supabase Edge Functions)
export const EMAIL_TEMPLATE_CONTENT = {
  'order-created': `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <div style="background: linear-gradient(135deg, #ebcc68, #e3d084); padding: 20px; text-align: center;">
        <h1 style="color: #74652f; margin: 0;">Golden Grove</h1>
        <p style="color: #74652f; margin: 5px 0;">Premium Beverages</p>
      </div>

      <div style="padding: 30px; background: white;">
        <h2 style="color: #565f69;">New Order Received! 🎉</h2>
        <p>Great news! A new order has been placed:</p>

        <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <p><strong>Distributor:</strong> {{distributorName}}</p>
          <p><strong>Product:</strong> {{productType}}</p>
          <p><strong>Quantity:</strong> {{quantity}} units</p>
          <p><strong>Order Date:</strong> {{orderDate}}</p>
          <p><strong>Assigned Rep:</strong> {{assignedRep}}</p>
        </div>

        <p>Please review and process this order promptly.</p>

        <div style="text-align: center; margin: 30px 0;">
          <a href="{{crmUrl}}/orders" style="background: #ebcc68; color: #74652f; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold;">View Order</a>
        </div>
      </div>

      <div style="background: #f8f9fa; padding: 20px; text-align: center; font-size: 12px; color: #9cb2c2;">
        <p>Golden Grove CRM System - Internal Use Only</p>
      </div>
    </div>
  `,

  'follow-up-reminder': `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <div style="background: linear-gradient(135deg, #ebcc68, #e3d084); padding: 20px; text-align: center;">
        <h1 style="color: #74652f; margin: 0;">Golden Grove</h1>
        <p style="color: #74652f; margin: 5px 0;">CRM Reminder</p>
      </div>

      <div style="padding: 30px; background: white;">
        <h2 style="color: #565f69;">Follow-up Reminder ⏰</h2>
        <p>You have a follow-up scheduled for today:</p>

        <div style="background: #fff3cd; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #ffc107;">
          <p><strong>Distributor:</strong> {{distributorName}}</p>
          <p><strong>Communication Type:</strong> {{communicationType}}</p>
          <p><strong>Previous Summary:</strong> {{summary}}</p>
          <p><strong>Follow-up Date:</strong> {{followUpDate}}</p>
        </div>

        <p>Don't forget to reach out and log the communication.</p>

        <div style="text-align: center; margin: 30px 0;">
          <a href="{{crmUrl}}/communications" style="background: #ebcc68; color: #74652f; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold;">Log Communication</a>
        </div>
      </div>

      <div style="background: #f8f9fa; padding: 20px; text-align: center; font-size: 12px; color: #9cb2c2;">
        <p>Golden Grove CRM System - Internal Use Only</p>
      </div>
    </div>
  `
}

// Utility function to get user preferences
export const getUserNotificationPreferences = async (userId: string) => {
  const { data, error } = await supabase
    .from('user_notification_preferences')
    .select('*')
    .eq('user_id', userId)
    .single()

  if (error && error.code !== 'PGRST116') {
    throw error
  }

  // Default preferences if none exist
  return data || {
    email_orders: true,
    email_communications: true,
    email_reminders: true,
    email_assignments: true
  }
}
