import { Button, Divider, ListItem, Stack, Typography } from "@mui/material";
import React from "react";
import { useIntl } from "react-intl";
import {
  CreateProjectComponentSpecInput,
  PostProcessDetail,
} from "../../../../../../../generated/graphql";
import { TranslatableAttribute } from "../../../../../../../type/common";
import PostProcessInput from "../../../common/PostProcessInput";

const PostProcessSection = ({
  setComponentSpec,
  componentSpec,
  postProcessOptions,
}: {
  setComponentSpec: React.Dispatch<
    React.SetStateAction<CreateProjectComponentSpecInput>
  >;
  componentSpec: CreateProjectComponentSpecInput;
  postProcessOptions: TranslatableAttribute[];
}) => {
  const intl = useIntl();

  const setPostProcess = (ind: number) => (data: PostProcessDetail) => {
    setComponentSpec((prev) => {
      const allPostProcesses = [...prev.postProcess!];
      allPostProcesses!.splice(ind, 1, data);
      return {
        ...prev,
        postProcess: allPostProcesses,
      };
    });
  };

  const deletePostProcess = (ind: number) => () => {
    setComponentSpec((prev) => {
      const allPostProcesses = [...prev.postProcess!];
      allPostProcesses!.splice(ind, 1);
      return {
        ...prev,
        postProcess: allPostProcesses,
      };
    });
  };

  const addPostProcess = () => {
    setComponentSpec((prev) => {
      const prevPostProcess = prev.postProcess ? prev.postProcess : [];
      return {
        ...prev,
        postProcess: [...prevPostProcess, {} as PostProcessDetail],
      };
    });
  };

  return (
    <>
      <Stack>
        <ListItem>
          <Typography variant="subtitle2">
            {intl.formatMessage({
              id: "app.component.attribute.postProcess",
            })}
          </Typography>
        </ListItem>

        {componentSpec.postProcess?.map((postProcess, i) => {
          return (
            <>
              {i !== 0 && (
                <Divider sx={{ width: "95%", margin: "16px auto" }} />
              )}
              <ListItem>
                <PostProcessInput
                  componentSpec={componentSpec}
                  setPostProcess={setPostProcess(i)}
                  deletePostProcess={deletePostProcess(i)}
                  postProcess={postProcess}
                  postProcessOptions={postProcessOptions}
                />
              </ListItem>
            </>
          );
        })}
        <ListItem>
          <Button onClick={addPostProcess} variant="outlined">
            {!componentSpec.postProcess?.length
              ? intl.formatMessage({ id: "app.general.add" })
              : intl.formatMessage({ id: "app.general.addMore" })}
          </Button>
        </ListItem>
      </Stack>
    </>
  );
};

export default PostProcessSection;
