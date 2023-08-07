import axios from "axios";
import { useState, ReactNode } from "react";
import { XCircleIcon } from "@heroicons/react/20/solid";

type Methods = "head" | "options" | "put" | "post" | "patch" | "delete" | "get";

type ErrorItem = { message: string; field?: string };

type DoRequestParams = {
  url: string;
  method: Methods;
  body: object;
  onSuccess?: Function;
};

type DoRequestFunc = (args: DoRequestParams) => Promise<ReactNode | SessionUser>

export default function useRequest() {
  const [errors, setErrors] = useState<ReactNode>(null);

  const doRequest: DoRequestFunc = async ({ url, method, body, onSuccess }) => {
    try {
      const response = await axios[method](url, body);
      if (onSuccess) onSuccess(response.data);
      return response.data;
    } catch (error: any) {
      setErrors(
        // @ts-ignore
        <div class='rounded-md bg-red-50 p-4'>
          {/* @ts-ignore */}
          <div class='flex'>
            {/* @ts-ignore */}
            <div class='flex-shrink-0'>
              <XCircleIcon
                // @ts-ignore
                class='h-5 w-5 text-red-400'
                aria-hidden='true'
              />
            </div>
            {/* @ts-ignore */}
            <div class='ml-3'>
              {/* @ts-ignore */}
              <h3 class='text-sm font-medium text-red-800'>
                There were {error.response.data.errors?.length || null} errors
                with your submission
              </h3>
              {/* @ts-ignore */}
              <div class='mt-2 text-sm text-red-700'>
                {/* @ts-ignore */}
                <ul role='list' class='list-disc space-y-1 pl-5'>
                  {error.response.data.errors?.map((err: ErrorItem) => (
                    <li key={err.message}>{err.message}</li>
                  ))}
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
