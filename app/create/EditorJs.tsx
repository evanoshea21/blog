"use client";
import React from "react";
import EditorJS from "@editorjs/editorjs";
import { usePathname } from "next/navigation";
import { createBlog, updateBlog, getRandomBlog } from "@/app/server.actions";

import Header from "@editorjs/header";
import Quote from "@editorjs/quote";
// @ts-ignore
import Paragraph from "editorjs-paragraph-with-alignment";
// @ts-ignore
import RawTool from "@editorjs/raw";
import ImageTool from "@editorjs/image";
import Delimiter from "@editorjs/delimiter";
// @ts-ignore
import EditorjsList from "@editorjs/list";

import type { OutputData } from "@editorjs/editorjs";
import type { Blog, Json } from "@/lib/types";

interface Props {
  existingContent: Blog | null;
}

function EditorJs({ existingContent }: Props) {
  const pathname = usePathname();
  const editorRef = React.useRef<EditorJS | null>(null);

  const [slug, setSlug] = React.useState<string>("");
  const [title, setTitle] = React.useState<string>();
  const [description, setDescription] = React.useState<string | null>(null);
  const [image, setImage] = React.useState<string | null>(null);
  const [status, setStatus] = React.useState<string>();
  const [isFeatured, setIsFeatured] = React.useState<boolean>(false);
  const [category, setCategory] = React.useState<string | null>(null);
  const [author, setAuthor] = React.useState<string>();

  //TODO #100: validate fetched blog data content (for update path) is valid OutputData before putting it into the data config field

  React.useEffect(() => {
    // if current path contains
    // TODO: make sure that final value is passed as existing content. Do we even need to useEffect this since `await` is used in parent component? :
    // if(pathname.includes("update") && !existingContent) return
    let content;
    if (existingContent) {
      content = existingContent.content as unknown as OutputData;
      setSlug(existingContent.slug);
      setTitle(existingContent.title);
      setDescription(existingContent.description);
      setImage(existingContent.image);
      setStatus(existingContent.status);
      setIsFeatured(existingContent.isFeatured || false);
      setCategory(existingContent.category);
      setAuthor(existingContent.author);
    }
    const editor: EditorJS = new EditorJS({
      holder: "editorjs",
      tools: {
        header: Header,
        quote: Quote,
        paragraph: {
          class: Paragraph,
          inlineToolbar: true,
        },
        delimiter: Delimiter,
        image: {
          class: ImageTool,
          //TODO: make this a Next.js server endpoint which uses Supabase Storage api and returns the image URL;
          config: {
            /**
             * Custom uploader
             */
            uploader: {
              /**
               * Upload file to the server and return an uploaded image data
               * @param {File} file - file selected from the device or pasted by drag-n-drop
               * @return {Promise.<{success, file: {url}}>}
               */
              uploadByFile(file: File) {
                // your own uploading logic here
                return FileUploader.upload(file).then((imgURL) => {
                  console.log("My Ajax response: ", imgURL);
                  return {
                    success: 1,
                    file: {
                      url: imgURL,
                      // any other image data you want to store, such as width, height, color, extension, etc
                    },
                  };
                });
              },

              /**
               * Send URL-string to the server. Backend should load image by this URL and return an uploaded image data
               * @param {string} url - pasted image URL
               * @return {Promise.<{success, file: {url}}>}
               */
              uploadByUrl(url: any) {
                // your ajax request for uploading
                return FileUploader.upload(url).then((imgURL) => {
                  console.log("My Ajax response: ", imgURL);
                  return {
                    success: 1,
                    file: {
                      url: imgURL,
                      // any other image data you want to store, such as width, height, color, extension, etc
                    },
                  };
                });
              },
            },
          },
        },
        EditorjsList: {
          // @ts-ignore
          class: EditorjsList,
          inlineToolbar: true,
          config: {
            defaultStyle: "unordered",
          },
        },
        raw: RawTool,
        // list: List,
      },
      onChange: (api, event) => {
        console.log("API:\n", api);
        console.log("Change event:\n", event);
      },
      onReady: () => {
        editorRef.current = editor;
      },
      data: content,
    });
  }, [existingContent]);

  function handleSave() {
    if (!editorRef.current) return;
    // console.log("ref:");

    if (!slug) {
      console.error("NEED SLUG");
      // TODO: handle error (red error variant of input)
      return;
    }

    editorRef.current
      .save()
      .then((outputData: OutputData) => {
        let content = outputData as unknown as Json;

        const blogData: Blog = {
          slug,
          title,
          description,
          image,
          status,
          isFeatured,
          category,
          content,
          // content: JSON.parse(JSON.stringify(outputData)),
          author,
        };
        console.log("Blog Data: \n", blogData);

        if (pathname.includes("create")) {
          return createBlog(blogData);
        } else if (pathname.includes("update")) {
          const slugToUpdate = pathname.slice(pathname.lastIndexOf("/") + 1);
          console.log("SLUG for UPDATE: ", slugToUpdate);
          return updateBlog(slugToUpdate, blogData);
        }
      })
      .then((res) => {
        console.log(
          `Successfully ${pathname.includes("update") ? "Updated" : "Created"} blog`
        );
      })
      .catch((error: any) => {
        console.log("Saving failed: ", error);
      });
  }

  return (
    <>
      <form
        style={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <label htmlFor="slug">Slug:</label>
        <input
          type="text"
          id="slug"
          name="slug"
          onChange={(e) => setSlug(e.target.value)}
          value={slug}
        />
        <label htmlFor="title">title:</label>
        <input
          type="text"
          id="title"
          name="title"
          onChange={(e) => setTitle(e.target.value)}
          value={title ?? ""}
        />
        <label htmlFor="description">description:</label>
        <input
          type="text"
          id="description"
          name="description"
          onChange={(e) => setDescription(e.target.value)}
          value={description ?? ""}
        />
        <label htmlFor="image">image:</label>
        <input
          type="text"
          id="image"
          name="image"
          onChange={(e) => setImage(e.target.value)}
          value={image ?? ""}
        />
        <label htmlFor="status">status:</label>
        <input
          type="text"
          id="status"
          name="status"
          onChange={(e) => setStatus(e.target.value)}
          value={status ?? ""}
        />
        <label htmlFor="isFeatured">isFeatured:</label>
        <input
          type="checkbox"
          id="isFeatured"
          name="isFeatured"
          onChange={(e) => setIsFeatured(e.target.checked)}
          value={String(isFeatured)}
        />
        <label htmlFor="category">category:</label>
        <input
          type="text"
          id="category"
          name="category"
          onChange={(e) => setCategory(e.target.value)}
          value={category ?? ""}
        />
        <label htmlFor="author">author:</label>
        <input
          type="text"
          id="author"
          name="author"
          onChange={(e) => setAuthor(e.target.value)}
          value={author ?? ""}
        />
      </form>
      <button onClick={handleSave}>
        {pathname.includes("update") ? "Update" : "Create"} Blog
      </button>
    </>
  );
}

interface FileUploaderI {
  upload: (f: File) => Promise<string>;
}

const FileUploader: FileUploaderI = {
  upload: (file: File) => {
    console.log("File uploading...", file);

    return new Promise((resolve) => {
      setTimeout(() => {
        // do DB stuff with file...
        // TODO: Supa Storage upload stuff (do on the server)

        // then resolve with the S3 url:
        resolve(
          "https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto/Homepage-Promotional-Carousel-Model-3-Desktop-US.png"
        );
      }, 1500);
    });
  },
};

export default EditorJs;
