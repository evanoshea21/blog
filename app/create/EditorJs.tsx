import React from "react";
import EditorJS from "@editorjs/editorjs";
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

interface Props {
  existingContent?: OutputData;
}

function EditorJs({ existingContent }: Props) {
  const editorRef = React.useRef<EditorJS | null>(null);

  React.useEffect(() => {
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
      data: existingContent ?? undefined,
    });
  }, []);

  function handleSave() {
    if (!editorRef.current) return;
    // console.log("ref:");
    // console.log(editorRef.current);

    editorRef.current
      .save()
      .then((outputData: OutputData) => {
        // HANDLE DATA HERE
        console.log("Article data down 'ere: \n", outputData);

        console.log(JSON.stringify(outputData));
      })
      .catch((error: any) => {
        console.log("Saving failed: ", error);
      });
  }

  return <button onClick={handleSave}>Save</button>;
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

        // then resolve with the S3 url:
        resolve(
          "https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto/Homepage-Promotional-Carousel-Model-3-Desktop-US.png"
        );
      }, 1500);
    });
  },
};

export default EditorJs;
