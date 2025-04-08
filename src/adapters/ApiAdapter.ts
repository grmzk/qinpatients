// import axios from "axios";
//
// const ApiAdapter = (baseURL: string) => {
//   const client = axios.create({
//     baseURL: baseURL,
//   });
//
//   return {
//     get: async (url: string) => {
//       const response = await client.get(url);
//       return response.data;
//     },
//
//     post: async (url: string, data: {} | {}[]) => {
//       const response = await client.post(url, data);
//       return response.data;
//     },
//
//     put: async (url: string, data: {} | {}[]) => {
//       const response = await client.put(url, data);
//       return response.data;
//     },
//
//     delete: async (url: string) => {
//       const response = await client.delete(url);
//       return response.data;
//     },
//   };
// };
//
// export default ApiAdapter;

export {};
