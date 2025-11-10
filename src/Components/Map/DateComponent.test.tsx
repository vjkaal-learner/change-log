import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { DateComponent } from './DateComponent';

describe('DateComponent', () => {

    test('renders the Date Component when loading in true', () => {
        const dateObj = {
            id: 1,
            date: '27 October 2025'
        };
        render(
          <DateComponent
            id={dateObj.id}
            date={dateObj.date}
            loading={true}
          />
        );
        const dateElement = screen.getByTestId('DateComponent-' + dateObj.id);
        expect(dateElement).toBeInTheDocument();
    });

    test('renders the Date Component when date format dd month yyyy', () => {
        const dateObj = {
            id: 1,
            date: '27 October 2025'
        };
        render(
            <DateComponent
                id={dateObj.id}
                date={dateObj.date}
                loading={false}
            />
        );
        const dateElement = screen.getByTestId('DateComponent-' + dateObj.id);
        expect(dateElement).toBeInTheDocument();
        // console.log(dateElement);
        expect(dateElement).toHaveTextContent(dateObj.date);
    });

    test('renders the Date Component when date format dd mon yyyy', () => {
        const dateObj = {
            id: 1,
            date: '27 Oct 2025'
        };
        render(
            <DateComponent
                id={dateObj.id}
                date={dateObj.date}
                loading={false}
            />
        );
        const dateElement = screen.getByTestId('DateComponent-' + dateObj.id);
        expect(dateElement).toBeInTheDocument();
        // console.log(dateElement);
        expect(dateElement).toHaveTextContent(dateObj.date);
    });

    test('renders the Date Component when date format dd-mm-yyyy', () => {
        const dateObj = {
            id: 1,
            date: '27-10-2025'
        };
        render(
            <DateComponent
                id={dateObj.id}
                date={dateObj.date}
                loading={false}
            />
        );
        const dateElement = screen.getByTestId('DateComponent-' + dateObj.id);
        expect(dateElement).toBeInTheDocument();
        // console.log(dateElement);
        expect(dateElement).toHaveTextContent(dateObj.date);
    });

    test('renders the Date Component when date format dd-mm-yy', () => {
        const dateObj = {
            id: 1,
            date: '27-10-25'
        };
        render(
            <DateComponent
                id={dateObj.id}
                date={dateObj.date}
                loading={false}
            />
        );
        const dateElement = screen.getByTestId('DateComponent-' + dateObj.id);
        expect(dateElement).toBeInTheDocument();
        // console.log(dateElement);
        expect(dateElement).toHaveTextContent(dateObj.date);
    });
})