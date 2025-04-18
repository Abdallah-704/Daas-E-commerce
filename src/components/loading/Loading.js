import "../../css/components/loading.css"
import { useTheme } from "../../context/ThemeContext"

const Loading = () => {
    const { theme } = useTheme();

    return (
        <div
            className="spinner-container-submit"
            style={{
                backgroundColor: `${theme.colors.background}F0`,
                left: 0,
                right: 0,
                bottom: 0
            }}
        >
            <div className="spinner"></div>
        </div>
    );
}

export default Loading;