import {injectable} from "inversify";

export declare type ApiResponse<T> = {
  status: number,
  data: T,
  nextPage: string
}

@injectable()
export class BaseService {
  parseResponse<T>(response: any, nextPage?: string): ApiResponse<T> {
    let data;
    if (response) {
      if (response.data) {
        data = response.data
      } else {
        data = response
      }
    } else {
      data = -1
    }
    return {
      status: response ? response.status : -1,
      data: data,
      nextPage: nextPage
    }
  }

  async sleep(ms: number) {
    return new Promise(resolve => {
      setTimeout(resolve, ms)
    })
  }
}
