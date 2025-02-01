import {createContext, useContext} from "react";

const TemplateConfigContext = createContext()

export function TemplateConfigProvider({value, children}){
  //console.log(value.tamplateConfig?.personal?.socialNetworks)
  return (
    <TemplateConfigContext.Provider value={value}>
      {children}
    </TemplateConfigContext.Provider>
  )
}
export const useTemplateConfig = () => useContext(TemplateConfigContext );