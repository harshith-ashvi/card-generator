figma.showUI(__html__);

figma.ui.resize(500, 400);

figma.ui.onmessage = async (pluginMessage) => {
  await figma.loadAllPagesAsync();
  await figma.loadFontAsync({ family: "Rubik", style: "Regular" });

  const postComponentSet = figma.root.findOne(
    (node) => node.type === "COMPONENT_SET" && node.name === "post"
  ) as ComponentSetNode;

  const imageVariant = {
    "1": "none",
    "2": "single",
    "3": "carousel",
  };

  const variant = postComponentSet.findOne(
    (node) =>
      node.type === "COMPONENT" &&
      node.name ===
        `Image=${
          imageVariant[
            (pluginMessage.imageVariant || "1") as keyof typeof imageVariant
          ]
        }, Dark mode=${pluginMessage.isDarkMode}`
  ) as ComponentNode;

  const newPost = variant.createInstance();

  const postName = newPost.findOne(
    (node) => node.name === "displayName" && node.type === "TEXT"
  ) as TextNode;
  const postUsername = newPost.findOne(
    (node) => node.name === "@username" && node.type === "TEXT"
  ) as TextNode;
  const postDescription = newPost.findOne(
    (node) => node.name === "description" && node.type === "TEXT"
  ) as TextNode;

  postName.characters = pluginMessage.name;
  postUsername.characters = pluginMessage.username;
  postDescription.characters = pluginMessage.description;

  figma.closePlugin();
};
