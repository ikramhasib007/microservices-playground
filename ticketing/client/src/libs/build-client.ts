import type { GetServerSidePropsContext } from "next";
import axios from "axios";

export default function buildClient(ctx: GetServerSidePropsContext) {
  if (typeof window === undefined) {
    // on the server
    return axios.create({
      baseURL:
        "http://ingress-nginx-controller.ingress-nginx.svc.cluster.local",
      headers: ctx.req.headers,
    });
  } else {
    // on the browser
    return axios.create({
      baseURL: "/",
    });
  }
}
