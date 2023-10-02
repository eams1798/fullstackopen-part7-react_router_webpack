import axios from "axios";
import { IBlog, UpdatableBlogParameters } from "../interfaces/blog";
import storageService from "./storage";
const baseUrl = "/api/blogs";

const config = {
  headers: {
    Authorization: storageService.getLoggedUser() ?
      `Bearer ${storageService.getToken()}` : null
  }
};

const getAll = async (): Promise<IBlog[]> => {
  console.log(`connecting to ${baseUrl}`);
  try {
    const response = await axios.get<IBlog[]>(baseUrl);
    return response.data.reverse();
  } catch {
    console.error;
    return [];
  }
};

const create = async (newBlog: IBlog): Promise<IBlog> => {
  const { data }: { data: IBlog } = await axios.post(baseUrl, newBlog, config);

  return data;
};

const update = async (
  blogId: string,
  parameters: UpdatableBlogParameters,
): Promise<IBlog> => {
  const { data }: { data: IBlog } = await axios.put(
    `${baseUrl}/${blogId}`,
    parameters,
    config,
  );

  return data;
};
const remove = async (blogId: string): Promise<void> => {
  await axios.delete(`${baseUrl}/${blogId}`, config);
};
export default { getAll, create, update, remove };
