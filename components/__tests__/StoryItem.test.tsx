import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import StoryItem from "../StoryItem";

describe("StoryItem Component", () => {
  const mockStory = {
    by: 'theyeti',
    descendants: 16,
    id: 9129911,
    kids: [
      9129990, 9130206,
      9130376, 9130273,
      9131289, 9131728,
      9137773, 9132476
    ],
    score: 78,
    text: '',
    time: 1425261906,
    title: 'Venture Capital in the 1980s',
    type: 'story',
    url: 'http://reactionwheel.net/2015/01/80s-vc.html',
    comments: []
  };

  it("renders the story title and author", () => {
    const { getByText } = render(<StoryItem story={mockStory} onPress={() => { }} />);

    expect(getByText(/Venture Capital in the 1980s/i)).toBeTruthy();
    expect(getByText(/theyeti/i)).toBeTruthy();
  });
});
