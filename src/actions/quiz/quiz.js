import instance from "../instance";
import { token } from "../../config/token";

const index = (type) =>
  instance({
    url: `/api/quizzes?type=${type}`,
    method: "get",
    headers: {
      Authorization: "Bearer " + token(),
    },
  });

const postQuiz = (postData) =>
  instance({
    url: `/api/guru/quizzes`,
    data: postData,
    method: "post",
    headers: {
      Authorization: "Bearer " + token(),
      "Content-Type": "multipart/form-data",
    },
  });

const updateQuiz = (putData, slug) =>
  instance({
    url: `/api/guru/quizzes/${slug}`,
    data: putData,
    method: "post",
    headers: {
      Authorization: "Bearer " + token(),
      "Content-Type": "multipart/form-data",
    },
  });

const deleteQuiz = (slug) =>
  instance({
    url: `/api/guru/quizzes/${slug}`,
    method: "delete",
    headers: {
      Authorization: "Bearer " + token(),
    },
  });

const apiQuiz = {
  index,
  deleteQuiz,
  postQuiz,
  updateQuiz,
};

export default apiQuiz;
