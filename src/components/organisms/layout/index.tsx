import { useState, useEffect, useMemo, useContext } from "react";
import { Box } from "@chakra-ui/react";
import useWindowSize from "@src/hooks/useWindowResize";
import Sidebar from "@src/components/molecules/sidebar/Sidebar";
import { SidebarState } from "@src/hooks/useContext";
import { RxHamburgerMenu } from "react-icons/rx";

const LAYOUT_WIDTHS = {
  LARGE: "265px",
  SMALL: "80px",
};

const Layout = ({ children }: ILayout) => {
  const { width } = useWindowSize();
  const [showSidebar, setShowSidebar] = useState(true);
  useEffect(() => {
    if (width < 640) {
      setShowSidebar(false);
    } else {
      setShowSidebar(true);
    }
  }, [width]);

  const sidebarWidth = useMemo(
    () => (showSidebar ? LAYOUT_WIDTHS.LARGE : LAYOUT_WIDTHS.SMALL),
    [showSidebar]
  );

  return (
    <Box display="grid" gridTemplateColumns="auto 1fr">
      <Sidebar width={sidebarWidth} isCollapse={!showSidebar} />
      <Box height="100vh" maxH="100vh" overflowY="auto">
        <SidebarState.Provider value={{ showSidebar, setShowSidebar }}>
          <RxHamburgerMenu
            onClick={() => setShowSidebar(!showSidebar)}
            style={{ position: "absolute", top: "24px", cursor: "pointer" }}
          />
          <Box sx={{ "&::-webkit-scrollbar": { display: "none" } }}>
            {children}
          </Box>
        </SidebarState.Provider>
      </Box>
    </Box>
  );
};

interface ILayout {
  children: React.ReactNode;
}

export default Layout;

export function getSidebarState() {
  const sidebarOpen = useContext(SidebarState);
  return sidebarOpen as {
    showSidebar: boolean;
    setShowSidebar: React.Dispatch<React.SetStateAction<boolean>>;
  };
}
