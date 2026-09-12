import AppRouter from "./router/AppRouter";

import { FullscreenProvider } from "./context/FullscreenContext";

export default function App() {

    return (

        <FullscreenProvider>

            <AppRouter />

        </FullscreenProvider>

    );

}