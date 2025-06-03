import { OutputBlockData } from "@editorjs/editorjs";
import { JSX } from "react";
import classes from "./styles.module.css";

interface Props {
  block: OutputBlockData;
}

interface ListItem {
  meta: Record<any, any>;
  items: ListItem[];
  content: string;
}
function Block({ block }: Props) {
  switch (block.type) {
    case "header":
      return renderHeader(block);

    case "paragraph":
      const lineBreakText: string[] = block.data.text
        .split("<br>")
        .filter((item: string) => item.length !== 0);

      return (
        <p style={{ textAlign: block.data.alignment }}>
          {lineBreakText.length === 1 ? (
            <>{lineBreakText[0]}</>
          ) : (
            <>
              {lineBreakText.map((paraText, i) => {
                return (
                  <span key={i} style={{ display: "block" }}>
                    {paraText}
                  </span>
                );
              })}
            </>
          )}
        </p>
      );

    case "quote":
      return (
        <blockquote cite="https://example.com/article">
          Quote: {block.data.text}
        </blockquote>
      );

    case "delimiter":
      // return <hr style={{ margin: "80px 0" }} />;
      return (
        <p
          style={{
            textAlign: "center",
            letterSpacing: "0.5em",
            fontSize: "1.8rem",
          }}
        >
          ***
        </p>
      );

    case "image":
      return (
        <div className={classes.imgBox}>
          <img
            style={{
              objectFit: "contain",
              width: "100%",
              height: "100%",
            }}
            src={block.data.file.url}
          />
        </div>
      );

    case "EditorjsList":
      // unordered ordered checklist
      return renderList(block.data.style, block.data.items, 0);

    case "raw":
      return <div dangerouslySetInnerHTML={{ __html: block.data.html }} />;
  }
}

function renderHeader(block: OutputBlockData): JSX.Element {
  switch (block.data.level) {
    case 1:
      return <h1>H1: {block.data.text}</h1>;

    case 2:
      return <h2>H2: {block.data.text}</h2>;

    case 3:
      return <h3>H3: {block.data.text}</h3>;

    case 4:
      return <h4>H4: {block.data.text}</h4>;

    case 5:
      return <h5>H5: {block.data.text}</h5>;

    case 6:
      return <h6>H6: {block.data.text}</h6>;

    default:
      return <></>;
  }
}

function renderList(
  listStyle: "unordered" | "ordered" | "checkbox",
  listItems: ListItem[],
  level: number
): JSX.Element {
  // console.log("List Style: ", listStyle);
  // console.log("List Items: ", listItems);
  let olType: "1" | "a" | "A" | "i" | "I" = "1";

  if (level % 3 == 0) olType = "1";
  else if (level % 3 == 1) olType = "a";
  else if (level % 3 == 2) olType = "i";

  if (listStyle == "ordered") {
    return (
      <ol type={olType}>
        {listItems.map((item: ListItem, i: number) => {
          return (
            <li key={i}>
              {item.content}
              {item.items.length > 0 &&
                renderList(listStyle, item.items, level + 1)}
            </li>
          );
        })}
      </ol>
    );
  } else if (listStyle == "unordered") {
    return (
      <ul>
        {listItems.map((item: ListItem, i: number) => {
          return (
            <li key={i}>
              {item.content}
              {item.items.length > 0 &&
                renderList(listStyle, item.items, level + 1)}
            </li>
          );
        })}
      </ul>
    );
  } else {
    // TODO: style for checkbox here
    return (
      <ul>
        {listItems.map((item: ListItem, i: number) => {
          return (
            <li key={i}>
              {item.content}
              {item.items.length > 0 &&
                renderList(listStyle, item.items, level + 1)}
            </li>
          );
        })}
      </ul>
    );
  }
}

export default Block;
