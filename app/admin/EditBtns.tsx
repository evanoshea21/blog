"use client";
import React from "react";
import Link from "next/link";
import { deleteBlogBySlug, refreshAdminPage } from "../server.actions";
import classes from "./styles.module.css";

interface Props {
  slug: string;
}

function EditBtns({ slug }: Props) {
  const [deleted, setDeleted] = React.useState<boolean>(false);

  function handleDelete() {
    deleteBlogBySlug(slug)
      .then((res) => {
        console.log(res);
        setDeleted(true);
        refreshAdminPage();
      })
      .catch((err) => console.error(err));
  }
  return (
    <div className={classes.btnBox}>
      <Link href={`/blog/${slug}`}>Preview</Link>
      <Link href={`/update/${slug}`}>Update</Link>
      <button className={classes.deleteBtn} onClick={handleDelete}>
        {deleted ? "Has been Deleted!" : "Delete"}
      </button>
    </div>
  );
}

export default EditBtns;
