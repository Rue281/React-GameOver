import ActionCategory from "../ActionCategory/ActionCategory";
import ActionRPGCategory from "../ActionRPGCategory/ActionRPGCategory";
import BattleRoyaleCategory from "../BattleRoyaleCategory/BattleRoyaleCategory";
import FantasyCategory from "../FantasyCategory/FantasyCategory";
import FlightCategory from "../FlightCategory/FlightCategory";
import OpenWorldCategory from "../OpenWorldCategory/OpenWorldCategory";
import RacingCategory from "../RacingCategory/RacingCategory";
import ShooterCategory from "../ShooterCategory/ShooterCategory";
import SocialCategory from "../SocialCategory/SocialCategory";
import SportsCategory from "../SportsCategory/SportsCategory";
import ZombieCategory from "../ZombieCategory/ZombieCategory";

const tabs = [
    {
        title: "Racing",
        id: "racing",
        content: RacingCategory
    },
    {
        title: "Sports",
        id: "sports",
        content: SportsCategory,
      },
      {
          title: "Social",
          id: "social",

          content: SocialCategory,
        },
        {
        title: "Shooter",
        id: "shooter",
        content: ShooterCategory,
      },
      {
        title: "Open-World",
        id: "open-world",
        content: OpenWorldCategory,
      },
    {
        title: "Zombie",
        id: "zombie",
        content: ZombieCategory,
      },
    {
        title: "Fantasy",
        id: "fantasy",
        content: FantasyCategory,
      },
    {
        title: "Action-rpg",
        id: "action-rpg",
        content: ActionRPGCategory,
      },
    {
        title: "Action",
        id: "action",
        content: ActionCategory,
      },
    {
        title: "Flight",
        id: "flight",
        content: FlightCategory,
      },
    {
        title: "Battle-Royale",
        id: "battle-royale",
        content: BattleRoyaleCategory,
      },
];
export default tabs;