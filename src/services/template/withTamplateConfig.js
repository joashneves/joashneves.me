import readYamlFile from "read-yaml-file/index";
import path from "path";

export async function withTemplateConfig(props = {}) {
  const PATH_TEMPLATE_CONFIG = path.resolve(".", "template-config.yml");
  const tamplateConfig = await readYamlFile(PATH_TEMPLATE_CONFIG);
  console.log(tamplateConfig);
  return {
    tamplateConfig,
    ...props,
  };
}
