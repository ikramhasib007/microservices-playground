import axios from "axios";
import { headers } from "next/headers";

export default function buildClient() {
  const requestHeaders = new Headers(headers());
  const transformHeaders: any = {};

  requestHeaders.forEach((value, key) => {
    transformHeaders[key] = value;
  });

  return axios.create({
    baseURL: "http://ingress-nginx-controller.ingress-nginx.svc.cluster.local",
    headers: transformHeaders,
  });
}
