import React from "react";
import Card from "../../components/shared/InterfaceElements/Card/Card";
import Input from "../../components/shared/InterfaceElements/Input/Input";

import { VALIDATOR_REQUIRE } from "../../components/utils/validators";
import "./AddImage.scss";

const AddImage = () => {
  return (
    <form className="image-add">
      <Card>
        <Input label="Image name:" validators={[VALIDATOR_REQUIRE()]} />
      </Card>
    </form>
  );
};

export default AddImage;
