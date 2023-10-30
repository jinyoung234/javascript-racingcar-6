import { Random } from '@woowacourse/mission-utils';
import RacingGame from '../../src/models/RacingGame.js';

describe('RacingResult 테스트', () => {
  beforeAll(() => {
    Random.pickNumberInRange = () => 4;
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  test.each([
    {
      input: {
        carNames: ['carA', 'carB'],
        moveCount: 3,
      },
      expected: [
        [
          { carName: 'carA', position: 1 },
          { carName: 'carB', position: 1 },
        ],
        [
          { carName: 'carA', position: 2 },
          { carName: 'carB', position: 2 },
        ],
        [
          { carName: 'carA', position: 3 },
          { carName: 'carB', position: 3 },
        ],
      ],
    },
    {
      input: {
        carNames: ['car1', 'car2', 'car3'],
        moveCount: 1,
      },
      expected: [
        [
          { carName: 'car1', position: 1 },
          { carName: 'car2', position: 1 },
          { carName: 'car3', position: 1 },
        ],
      ],
    },
  ])(
    '자동차 이름이 $input.carNames 이고 이동 횟수가 $input.moveCount 일 때, 예상 대로 자동차 경주가 진행 된다.',
    ({ input: { carNames, moveCount }, expected }) => {
      // given
      const racingGame = new RacingGame(carNames, moveCount);

      // when
      const racingResult = racingGame.play();

      // then
      expect(racingResult).toStrictEqual(expected);
    },
  );
});
