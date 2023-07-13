import type { GetServerSidePropsContext } from "next";
import axios from "axios";

export default function buildClient(ctx: GetServerSidePropsContext) {
  return axios.create({
    baseURL: "http://ingress-nginx-controller.ingress-nginx.svc.cluster.local",
    headers: ctx.req.headers,
  });
}
