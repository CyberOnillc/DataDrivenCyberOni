import { ChevronDown, PlusCircle, X } from "lucide-react";
import { useEffect, useState } from "react";
import ColorPickerModal from "../shared/ColorPickerModal";
import { arraysAreEqual } from "@/lib/utils";
import Tooltip from "../shared/tooltip";
import { useNotify } from "../Notification";
interface Props {
    colors: string[];
    onChange: (value: string[]) => void;
}
function AppBuilderColorPicker(props: Props) {
    const [colors, setColors] = useState(props.colors);
    const [currentColor, setCurrentColor] = useState(0);
    const [showColorPicker, setShowColorPicker] = useState(false);
    const notify = useNotify()
    function updateColor(color: string, index: number) {
        const newArray = [...colors];
        newArray[index] = color;

        // Update state with the new array
        setColors(newArray);
    }

    function addColor() {
        if (colors.length < 3) {
            setColors(prev => [...prev, '#000000'])
        } else {
            notify('Only three colors can be added', 'fail')

        }

    }
    function removeColor(indexToRemove: number) {

        if (colors.length > 1) {
            setColors(prevColors => prevColors.filter((_, index) => index !== indexToRemove));

        } else {
            notify('Need at least one color for component', 'fail')

        }

    }

    useEffect(() => {
        if (!arraysAreEqual(props.colors, colors)) {
            props.onChange(colors);
        }
    }, [colors, props]);

    return (
        <>
            <div className="w-fit my-5">
                <span>Pick Upto 3 colors for this component</span>
                {colors.map((color, index) => (
                    <div className="flex w-full justify-end" key={index}>
                        <button
                            className="cursor-pointer"
                            type="button"
                            onClick={() => {
                                setCurrentColor(index), setShowColorPicker(true);
                            }}
                        >
                            <div className="my-5 flex w-fit items-center justify-center gap-4 rounded-md bg-gray-100 p-2 shadow-md dark:bg-slate-700">
                                <span
                                    className="h-5 w-5 rounded-full"
                                    style={{ background: color }}
                                />
                                <span>{color}</span>
                                <ChevronDown className="text-blue-500" />
                            </div>
                        </button>

                        <button
                            className="text-red-400"
                            type="button"
                            onClick={() => removeColor(index)}
                        >
                            <X />
                        </button>
                        <ColorPickerModal
                            color={colors[currentColor]}
                            onChange={(color) => updateColor(color, index)}
                            setShow={setShowColorPicker}
                            show={showColorPicker}
                        />
                    </div>
                ))}

                <div className="flex justify-end">
                    <Tooltip onClick={addColor} content="add color" type="button">
                        <div className="text-blue-400" >
                            <PlusCircle />
                        </div>
                    </Tooltip>
                </div>
            </div>
        </>
    );
}

export default AppBuilderColorPicker;
