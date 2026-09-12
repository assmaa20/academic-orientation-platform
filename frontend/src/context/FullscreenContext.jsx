import { createContext, useContext, useState } from "react";

const FullscreenContext = createContext();

export function FullscreenProvider({ children }) {

    const [fullscreen, setFullscreen] = useState(false);

    return (

        <FullscreenContext.Provider
            value={{
                fullscreen,
                setFullscreen
            }}
        >

            {children}

        </FullscreenContext.Provider>

    );

}

export function useFullscreen() {

    return useContext(FullscreenContext);

}