import axios from "axios";
import { useState, JSX } from "react";
import { XCircleIcon } from "@heroicons/react/20/solid";

type Methods = "head" | "options" | "put" | "post" | "patch" | "delete" | "get";

type ErrorItem = { message: string; field?: string }

type DoRequestType = {
  url: string;
  method: Methods;
  body: object;
};

export default function useRequest() {
  const [errors, setErrors] = useState<JSX.Element|null>(null);

  const doRequest = async ({ url, method, body }: DoRequestType) => {
    try {
      const response = await axios[method](url, body);
      return response.data;
    } catch (error: any) {
      setErrors(
        <div className='rounded-md bg-red-50 p-4'>
          <div className='flex'>
            <div className='flex-shrink-0'>
              <XCircleIcon
                className='h-5 w-5 text-red-400'
                aria-hidden='true'
              />
            </div>
            <div className='ml-3'>
              <h3 className='text-sm font-medium text-red-800'>
                There were {error.response.data.errors.length || null} errors with your submission
              </h3>
              <div className='mt-2 text-sm text-red-700'>
                <ul role='list' className='list-disc space-y-1 pl-5'>
                  {error.response.data.errors.map((err: ErrorItem) => <li key={err.message}>{err.message}</li>)}
                </ul>
              </div>
            </div>
          </div>
        </div>
      );
    }
  };

  return {
    doRequest,
    errors,
  };
}
