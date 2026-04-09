"use client"
import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useState } from "react";


type PreviewPageContextType = {
  preview: boolean;
  setPreview: Dispatch<SetStateAction<boolean>>;
};

const PreviewPageContext = createContext<PreviewPageContextType | null>(null);

export function PreviewPageProvider({children}: {children: ReactNode}){
        const [preview, setPreview] = useState(true);
        return <PreviewPageContext.Provider value={{preview, setPreview}}>{children}</PreviewPageContext.Provider>
}

export function usePreviewContext(){
      const context = useContext(PreviewPageContext);
      if(!context) throw new Error("usePreviewCoontext must be inside inside the provider");
      return context;
}