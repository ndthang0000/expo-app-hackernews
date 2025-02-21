import axios from "axios";
import { fetchStoryDetails } from "../hackerNewsAPI";

jest.mock("axios");

describe("fetchStory API", () => {
  it("fetches and returns story data", async () => {
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
      'comments:': [],
      comments: []
    };

    (axios.get as jest.Mock).mockResolvedValueOnce({ data: mockStory });

    const result = await fetchStoryDetails(9129911);
    expect(mockStory).toEqual(result);
    expect(axios.get).toHaveBeenCalledWith("https://hacker-news.firebaseio.com/v0/item/9129911.json");
  });
});
