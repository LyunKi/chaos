export enum Breakpoints {
  Phone = 360,
  Tablet = 768,
  Desktop = 1024,
}

export enum MediaType {
  Unknown,
  Phone,
  Tablet,
  Desktop,
}

export class MediaQuery {
  public static getMediaType(screenWidth?: number) {
    if (!screenWidth || screenWidth < Breakpoints.Phone) {
      return MediaType.Unknown
    }
    if (screenWidth < Breakpoints.Tablet) {
      return MediaType.Phone
    } else if (screenWidth < Breakpoints.Desktop) {
      return MediaType.Tablet
    } else {
      return MediaType.Desktop
    }
  }
}
