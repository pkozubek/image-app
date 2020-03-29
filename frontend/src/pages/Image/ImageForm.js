import React from "react";

export default function ImageForm({ name }) {
  return (
    <form>
      <input name="name" value={name} />
    </form>
  );
}
