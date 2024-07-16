import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class LoggerCustomService {
  private logger = new Logger(LoggerCustomService.name);

  logDone(userId: string, privateUrl: unknown): void {
    this.logger.log(
      `(OK) [USERID]: ${userId}, [PRIVATEURL]: ${privateUrl}`,
    );
  }

  logError(
    userId: string,
    privateUrl: string,
    code: string,
    error: unknown,
  ): void {
    try {
      this.logger.error(
        `(ERROR) [USERID]: ${userId}, [PRIVATEURL]: ${privateUrl}, [RESPONSE]: ${code}, [MESSAGE]: ${error}`,
      );
    } catch (error) {
      this.logger.error(`(ERROR)  Message: Error without the expected format.`);
    }
  }
  correctedUrl(url: string): string {
    const clearUrl = url.replace(/(https?:\/\/)/, '');
    const delimiter = '/';
    const parts = clearUrl.split(delimiter);
    parts.shift();
    return parts.join(delimiter);
  }
}
