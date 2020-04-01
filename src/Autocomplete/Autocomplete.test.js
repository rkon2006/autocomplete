import React from 'react';
import { fireEvent, render, waitForElement } from '@testing-library/react';
import { Autocomplete } from './Autocomplete';
import { AutocompleteApi } from '../api/AutocompleteApi';
import { waitForElementToBeRemoved } from '@testing-library/dom';

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
    const { getByText, getByPlaceholderText } = autocompleteElement;
    const input = getByPlaceholderText(/start typing/i);

    fireEvent.change(input, { target: { value: 'a' } });

    expect(input.value).toBe('a');

    const noSuggestionsBeforeCall = getByText(/No suggestions yet/i);

    expect(noSuggestionsBeforeCall).toBeDefined();

    let element;

    try {
      element = await waitForElementToBeRemoved(() => getByText(/No suggestions yet/i));
    } catch (e) {}

    expect(element).not.toBeDefined();
  });

  it('shows suggestions on start typing', async () => {
    AutocompleteApi.prototype.getSuggestions = jest.fn().mockImplementationOnce(() => {
      return ['Africa'];
    });
    const { getByText, getByPlaceholderText } = autocompleteElement;
    const input = getByPlaceholderText(/start typing/i);

    fireEvent.change(input, { target: { value: 'a' } });

    expect(input.value).toBe('a');

    await waitForElement(() => getByText(/Africa/i));
  });
});
