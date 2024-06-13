import { Button, ConfigProvider, Space } from "antd";

// Theme
import theme from "./styles/theme";
import { StyledButton } from "./components/common/Button/Button.Styles";
import { ThemeProvider } from "styled-components";

function App() {
  return (
    <ConfigProvider theme={theme}>
      <ThemeProvider theme={theme}>
        <Space>
          <Button type="primary">Primary</Button>
          <Button>Default</Button>
          <Button type="dashed">Dashed Button</Button>

          <StyledButton>fssssssssssss</StyledButton>
        </Space>
      </ThemeProvider>
    </ConfigProvider>
  );
}

export default App;
