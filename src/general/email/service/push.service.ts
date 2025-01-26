// push-notifications.service.ts

import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class PushNotificationsService {
  private readonly expoPushUrl = 'https://exp.host/--/api/v2/push/send';

  async sendPushNotification(expoPushToken: string, message: string, title: string) {
    try {
      const response = await axios.post(this.expoPushUrl, {
        to: expoPushToken,
        sound: 'chime',
        title: title,
        body: message,
        data: { 
          message,
          screen: "ActivityDetails", citaId: "5e9034f1-a63e-491d-b7f3-a03ca46a1033"
        },
      });

      console.log('Notificación enviada:', response.data);
    } catch (error) {
      console.error('Error al enviar notificación:', error.response || error);
    }
  }
}
