import { getAuth } from "@clerk/express";
import * as queries from "../db/queries";
import { Request, Response } from "express";

export const createComment = async (
  req: Request<{ productId: string }>,
  res: Response,
) => {
  try {
    const { userId } = getAuth(req);
    if (!userId) return res.status(401).json({ error: "Unauthorized" });

    const { productId } = req.params;
    const existProduct = await queries.getProductById(productId);
    if (!existProduct)
      return res.status(404).json({ error: "Product is not found" });

    const { content } = req.body;
    if (!content)
      return res.status(400).json({ error: "Comment content is required" });

    const comment = await queries.createComment({
      content,
      userId,
      productId,
    });

    return res.status(201).json({ comment });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Failed to create Comment" });
  }
};

export const deleteComment = async (
  req: Request<{ commentId: string }>,
  res: Response,
) => {
  try {
    const { userId } = getAuth(req);
    if (!userId) return res.status(401).json({ error: "Unauthorized" });

    const { commentId } = req.params;

    const existingComment = await queries.getCommentById(commentId);
    if (!existingComment)
      return res.status(404).json({ error: "Comment not found" });

    if (existingComment.userId !== userId) {
      return res
        .status(403)
        .json({ error: "You can only delete your own comments" });
    }

    const comment = await queries.deleteComment(commentId);

    return res.status(200).json({ comment });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Failed to delete Comment" });
  }
};
