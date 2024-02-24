import Conf from "../conf/Conf";
import { Client, ID, Databases, Storage, Query } from "appwrite";

export class Service {
  client = new Client();
  databases;
  bucket;

  constructor() {
    this.client
      .setEndpoint(Conf.appwriteUrl)
      .setProject(Conf.appwriteProjectId);
    this.databases = new Databases(this.client);
    this.bucket = new Storage(this.client);
  }

  async createPost({ title, slug, content, featuredImage, status, userId }) {
    try {
      return await this.databases.createDocument(
        Conf.appwriteDatabaseId,
        Conf.appwriteCollectionId,
        slug,
        { title, content, featuredImage, status, userId }
      );
    } catch (error) {
      console.log("error in createPost method", error);
    }
  }

  async updatePost(slug, { title, content, featuredImage, status }) {
    try {
      return await this.databases.updateDocument(
        Conf.appwriteDatabaseId,
        Conf.appwriteCollectionId,
        slug,
        {
          title,
          content,
          featuredImage,
          status,
        }
      );
    } catch (error) {
      console.log("error in creatPost method", error);
    }
  }

  async deletePost(slug) {
    try {
      await this.databases.deleteDocument(
        Conf.appwriteDatabaseId,
        Conf.appwriteCollectionId,
        slug
      );
      return true;
    } catch (error) {
      console.log("error in deletePost method", error);
      return false;
    }
  }

  async getPost(slug) {
    try {
      return await this.databases.getDocument(
        Conf.appwriteDatabaseId,
        Conf.appwriteCollectionId,
        slug
      );
    } catch (error) {
      console.log("error in getPost method", error);
    }
  }

  async getAllPosts(queries = [Query.equal("status", "active")]) {
    try {
      return await this.databases.listDocuments(
        Conf.appwriteDatabaseId,
        Conf.appwriteCollectionId,
        queries
      );
    } catch (error) {
      console.log("error in getAllPosts method", error);
      return false;
    }
  }

  async uploadFile(file) {
    try {
      return await this.bucket.createFile(
        Conf.appwriteBucketId,
        ID.unique(),
        file
      );
    } catch (error) {
      console.log("error in uploadFile method", error);
      return false;
    }
  }

  async deleteFile(fileId) {
    try {
      await this.bucket.deleteFile(Conf.appwriteBucketId, fileId);
      return true;
    } catch (error) {
      console.log("error in deleteFile method", error);
      return false;
    }
  }

  getFilePreview(fileId) {
    return this.bucket.getFilePreview(Conf.appwriteBucketId, fileId);
  }
}

const service = new Service();
export default service;
