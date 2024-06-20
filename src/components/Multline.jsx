import { Input as BaseInput } from '@mui/base/Input';
import { styled } from '@mui/system';
import { forwardRef } from 'react';

const Input = forwardRef(function CustomInput(props, ref, setValu) {
    const setValue = (e) => {
        setValu(String(e?.target?.value).trim())
    }
    return (
        <BaseInput
            onChange={(e) => setValue(e)}
            slots={{
                root: RootDiv,
                input: 'input',
                textarea: TextareaElement,
            }}
            {...props}
            ref={ref}
        />
    );
});

export default function InputMultiline({placeholder="Type something…", setValue}) {
    return <Input aria-label="Demo input" setValu={setValue} multiline placeholder={placeholder} />;
}

const RootDiv = styled('div')`
  display: flex;
  max-width: 100%;
`;

const TextareaElement = styled('textarea', {
    shouldForwardProp: (prop) =>
        !['ownerState', 'minRows', 'maxRows'].includes(prop.toString()),
})(
    ({ theme }) => `
  width: 320px;
  font-family: 'IBM Plex Sans', sans-serif;
  font-size: 0.875rem;
  font-weight: 400;
  line-height: 1.5rem;
  padding: 8px 12px;
  border-radius: 8px 8px 0 8px;
  color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
  background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
  border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
  box-shadow: 0px 2px 4px ${theme.palette.mode === 'dark' ? 'rgba(0,0,0, 0.5)' : 'rgba(0,0,0, 0.05)'
        };

  &:hover {
    border-color: ${blue[400]};
  }

  &:focus {
    border-color: ${blue[400]};
    box-shadow: 0 0 0 3px ${theme.palette.mode === 'dark' ? blue[700] : blue[200]};
  }

  // firefox
  &:focus-visible {
    outline: 0;
  }
`,
);