import { setState } from "@riadh-adrani/recursive";
import { Label, Form, Legend, FieldSet, Button, Input, TextArea } from "../../Standard.js";
import { Fragment, Row, Column } from "../../Utility.js";
import Spacer from "./Spacer.js";

export default function ({ fields = [], title, onSubmit = () => {}, style = {} }) {
    const data = {};
    const resetters = [];

    const dynamicStyle = (type) => {
        return style[type]
            ? {
                  className: `dynamic-form-${type}`,
                  scoped: true,
                  ...style[type],
              }
            : {};
    };

    const mergeGlobalAndSpecificStyles = (global, specific) => {
        const output = global || {};

        const specificWrapper = specific || {};

        for (let selector in specificWrapper) {
            if (["className", "scoped"].includes(selector)) continue;

            if (!output[selector]) output[selector] = {};

            output[selector] = { ...output[selector], ...specificWrapper[selector] };
        }

        return output;
    };

    const makeFieldState = (field, index) => {
        const fieldName = field.uid !== undefined ? field.uid : `formfield${index}`;
        const [value, setValue] = setState(fieldName, field.value !== undefined ? field.value : "");
        data[fieldName] = value;
        resetters.push(() => setValue(field.type == "checkbox" ? false : ""));

        return [value, setValue, fieldName];
    };

    const FieldLabel = (label, id) => {
        return Label({
            isFor: id,
            text: label,
            flags: { renderIf: label !== undefined },
            style: dynamicStyle("label"),
        });
    };

    const Field = (field, index) => {
        const [value, setValue, fieldName] = makeFieldState(field, index);

        const attributes = {
            accept: field.accept,
            alt: field.alt,
            autoComplete: field.autoComplete,
            capture: field.capture,
            checked: field.checked,
            dirname: field.dirname,
            disabled: field.disabled,
            form: field.form,
            formAction: field.formAction,
            formEncType: field.formEncType,
            formMethod: field.formMethod,
            formNoValidate: field.formNoValidate,
            formTarget: field.formTarget,
            height: field.height,
            list: field.list,
            max: field.max,
            maxLength: field.maxLength,
            min: field.min,
            minLength: field.minLength,
            multiple: field.multiple,
            name: field.name,
            pattern: field.pattern,
            placeholder: field.placeholder,
            readOnly: field.readOnly,
            required: field.required,
            size: field.size,
            src: field.src,
            step: field.step,
            type: field.type,
            width: field.width,
        };

        const wrapperStyle = mergeGlobalAndSpecificStyles(
            dynamicStyle("wrapper"),
            dynamicStyle(`${field.type}Wrapper`)
        );

        const Wrapped = Fragment({
            children: [
                FieldLabel(field.label, fieldName),
                Input({
                    value: value,
                    ...attributes,
                    props: { id: fieldName },
                    style: dynamicStyle(field.type),
                    events: {
                        onInput: (e) => {
                            setValue(field.type == "checkbox" ? e.target.checked : e.target.value);
                        },
                    },
                }),
            ],
        });

        return field.isRow
            ? Row({ style: wrapperStyle, children: Wrapped })
            : Column({ style: wrapperStyle, children: Wrapped });
    };

    const FilePicker = (field, index) => {
        const [, setValue, fieldName] = makeFieldState(field, index);

        return Row({
            style: mergeGlobalAndSpecificStyles(
                dynamicStyle("wrapper"),
                dynamicStyle(`${field.type}Wrapper`)
            ),
            children: [
                FieldLabel(field.label, fieldName),
                Input({
                    type: "file",
                    props: { id: fieldName },
                    style: dynamicStyle("file"),
                    placeholder: field.placeholder,
                    events: {
                        onInput: (e) => {
                            setValue({
                                file: e.target.files[0],
                                src: URL.createObjectURL(e.target.files[0]),
                            });
                        },
                    },
                }),
            ],
        });
    };

    const RadioPicker = (field, index) => {
        const [value, setValue, fieldName] = makeFieldState(field, index);

        return Column({
            style: mergeGlobalAndSpecificStyles(
                dynamicStyle("wrapper"),
                dynamicStyle(`${field.type}Wrapper`)
            ),
            children: [
                FieldLabel(field.label, fieldName),
                Column({
                    style: dynamicStyle("radioOptionsWrapper"),
                    children: (field.items || []).map((item) => {
                        return Row({
                            style: dynamicStyle("radioElementWrapper"),
                            events: {
                                onClick: () => {
                                    setValue(item.value);
                                },
                            },
                            children: [
                                Input({
                                    style: dynamicStyle("radioElement"),
                                    type: "radio",
                                    checked: item.value == value,
                                    name: field.name,
                                    value: item.value,
                                    props: { id: item.name },
                                }),
                                Label({
                                    text: item.label,
                                    isFor: item.name,
                                    style: dynamicStyle("radioElementLabel"),
                                }),
                            ],
                        });
                    }),
                }),
            ],
        });
    };

    const RangePicker = (field, index) => {
        const [value, setValue, fieldName] = makeFieldState(field, index);

        return Row({
            style: mergeGlobalAndSpecificStyles(
                dynamicStyle("wrapper"),
                dynamicStyle(`${field.type}Wrapper`)
            ),
            children: [
                FieldLabel(field.label, fieldName),
                Input({
                    type: "range",
                    props: { id: fieldName },
                    style: dynamicStyle("range"),
                    min: field.min,
                    max: field.max,
                    placeholder: field.placeholder,
                    value,
                    events: {
                        onInput: (e) => {
                            setValue(e.target.value);
                        },
                    },
                }),
                Spacer({ width: "5px" }),
                FieldLabel(value),
            ],
        });
    };

    const TextAreaField = (field, index) => {
        const fieldName = field.uid || `formfield${index}`;
        const [value, setValue] = setState(fieldName, field.value || "");
        data[fieldName] = value;

        return Column({
            style: mergeGlobalAndSpecificStyles(
                dynamicStyle("wrapper"),
                dynamicStyle(`${field.type}Wrapper`)
            ),
            children: [
                FieldLabel(field.label, fieldName),
                TextArea({
                    props: { id: fieldName },
                    value,
                    placeholder: field.placeholder,
                    autoComplete: field.autoComplete,
                    autofocus: field.autoFocus,
                    disabled: field.disabled,
                    readOnly: field.readOnly,
                    required: field.required,
                    style: dynamicStyle(field.type),
                    events: { onInput: (e) => setValue(e.target.value) },
                }),
            ],
        });
    };

    const compFields = fields.map((field, index) => {
        switch (field.type) {
            case "range":
                return RangePicker(field, index);
            case "textarea":
                return TextAreaField(field, index);
            case "radio":
                return RadioPicker(field, index);
            case "file":
                return FilePicker(field, index);
            default:
                return Field(field, index);
        }
    });

    return Form({
        children: FieldSet({
            style: dynamicStyle("form"),
            children: [
                Legend({
                    children: title,
                    style: dynamicStyle("title"),
                    flags: { renderIf: title != undefined },
                }),
                Fragment({ children: compFields }),
                Button({
                    children: "Submit",
                    style: mergeGlobalAndSpecificStyles(
                        dynamicStyle("button"),
                        dynamicStyle("submit")
                    ),
                    events: { onClick: () => onSubmit(data) },
                }),
                Button({
                    children: "Reset",
                    type: "reset",
                    style: mergeGlobalAndSpecificStyles(
                        dynamicStyle("button"),
                        dynamicStyle("reset")
                    ),
                }),
            ],
        }),
    });
}
