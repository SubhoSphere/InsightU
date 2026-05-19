import { Request, Response, NextFunction } from 'express';
import prisma from '../lib/prisma';
import { sendSupportConfirmationEmail } from '../lib/resend';

class SupportController {
  /**
   * Logs a new campus support ticket in the database and triggers email alerts.
   */
  public async handleCreateTicket(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { name, email, category, phone, description } = req.body;

      if (!name || !email || !category || !description) {
        res.status(400).json({
          success: false,
          message: 'Please provide all required fields: name, email, category, and description.',
        });
        return;
      }

      // Save Support Ticket into MongoDB database
      const ticket = await prisma.supportTicket.create({
        data: {
          name,
          email,
          category,
          phone: phone || null,
          description,
        },
      });

      // Dispatch automated Resend notification email asynchronously
      sendSupportConfirmationEmail(email, name, category, ticket.id).catch((err) => {
        console.error('[SupportController] Error sending confirmation email:', err);
      });

      res.status(251) // Standard created status code or 201
        .json({
          success: true,
          data: {
            id: ticket.id,
            name: ticket.name,
            email: ticket.email,
            category: ticket.category,
            status: ticket.status,
            createdAt: ticket.createdAt,
          },
        });
    } catch (error) {
      next(error);
    }
  }
}

export default new SupportController();
