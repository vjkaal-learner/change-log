import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import TextComponent from './TextComponent';

describe('TextComponent', () => {
    test('renders the Text Component when text if provided', () => {
        const textObj = {
            id: 1,
            text: 'I have updated the module'
        };
        render(
            <TextComponent
                id={textObj.id}
                text={textObj.text}
            />
        );
        const textElement = screen.getByTestId('TextComponent' + textObj.id);
        expect(textElement).toBeInTheDocument();
        // console.log(textElement);
        expect(textElement).toHaveTextContent(textObj.text);
    });

    test('renders component but empty string if no text provided', () => {
        const textObj = {
            id: 1,
            text: ''
        };
        render(
            <TextComponent
                id={textObj.id}
                text={textObj.text}
            />
        );
        const textElement = screen.getByTestId('TextComponent' + textObj.id);
        expect(textElement).toBeInTheDocument();
        expect(textElement).toHaveTextContent('');
    })
})