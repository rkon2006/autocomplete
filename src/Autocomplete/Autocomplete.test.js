import React from 'react';
import {
  fireEvent,
  render,
  waitForElement,
} from '@testing-library/react';
import { Autocomplete } from './Autocomplete';
import { AutocompleteApi } from '../api/AutocompleteApi';

jest.mock('../api/AutocompleteApi');

describe('Autocomplete', () => {
  let autocompleteElement;

  beforeEach(() => {
    autocompleteElement = render(<Autocomplete />);
  });
  it('renders start typing placeholder', () => {
    const { getByPlaceholderText } = autocompleteElement;
    const inputElement = getByPlaceholderText(/start typing/i);

    expect(inputElement).toBeInTheDocument();
  });

  it('shows No suggestions placeholder', async () => {
    AutocompleteApi.prototype.getSuggestions = jest.fn().mockReturnValueOnce([]);
    const { getByText, getByTestId, getByPlaceholderText } = autocompleteElement;
    const input = getByPlaceholderText(/start typing/i);

    expect(input.value).toBe('');

    fireEvent.change(input, { target: { value: 'a' } });

    await waitForElement(() => getByTestId('suggestionsWrapper'));

    expect(input.value).toBe('a');

    const noSuggestionsBeforeCall = getByText(/No suggestions yet/i);

    expect(noSuggestionsBeforeCall).toBeDefined();
  });

  it('shows suggestions on start typing', async () => {
    AutocompleteApi.prototype.getSuggestions = jest.fn().mockImplementationOnce(() => {
      return ['Africa', 'America'];
    });
    const { getByTestId, getByPlaceholderText } = autocompleteElement;
    const input = getByPlaceholderText(/start typing/i);

    fireEvent.change(input, { target: { value: 'a' } });

    await waitForElement(() => getByTestId('suggestionsWrapper'));

    expect(input.value).toBe('a');

    const lis = document.querySelectorAll('ul > li');

    expect(lis).toHaveLength(2);
  });
});
