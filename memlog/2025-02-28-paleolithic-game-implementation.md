# Warmth of Tribe - Implementation Plan

## File Structure and Changes

### Core Files to Update

1. **src/StoryTitle.tw**
   ```
   :: StoryTitle
   Warmth of Tribe
   ```

2. **src/StoryData.tw**
   ```
   :: StoryData
   {
       "ifid": "550E8400-E29B-41D4-A716-446655440000",
       "format": "SugarCube",
       "format-version": "2.30.0",
       "start": "Start",
       "zoom": 1,
       "tag-colors": {
           "childhood": "green",
           "teenage": "blue",
           "adult": "purple",
           "parent": "orange",
           "elder": "red"
       }
   }
   ```

3. **src/StoryScript.tw**
   - Add variables for tracking:
     - Basic needs (hunger, thirst, fatigue, health)
     - Character attributes (strength, dexterity, wisdom, charisma)
     - Relationships with key NPCs
     - Skills (hunting, gathering, crafting, etc.)
     - Current age and life stage
     - Gender and language preference
   - Add functions for:
     - Updating needs over time
     - Skill checks and improvements
     - Relationship changes
     - Age progression
     - Season changes

4. **src/StoryStylesheet.tw**
   - Update color scheme to earthy, natural tones
   - Add specific styling for:
     - Needs indicators
     - Skill displays
     - Relationship indicators
     - Season and weather descriptions

### New Passage Files to Create

#### Core System Passages

1. **src/SpecialPassages.tw** (Update)
   - StoryInit passage for variable initialization
   - PassageHeader for consistent UI elements
   - PassageFooter for needs display

#### Childhood Phase Passages

1. **src/Start.tw** (Update)
   - Introduction to the game concept
   - Language selection (English/Other)
   - Gender selection (Male/Female/Other)
   - Name input (or random generation)

2. **src/childhood/ChildhoodIntro.tw**
   - Narrative introduction to the character's birth
   - Description of the tribe and immediate family
   - First sensory experiences and memories
   - Transition to early childhood

3. **src/childhood/EarlyChildhood.tw**
   - First interactive choices as a young child (age 4-5)
   - Introduction to basic tribal life
   - Simple tasks and play activities
   - Meeting other children

4. **src/childhood/FirstLesson.tw**
   - Learning a basic skill from parent or elder
   - Choice of what to focus on (tracking, plant identification, crafting)
   - Success/failure mechanics based on simple choices
   - Reward of tribal approval

5. **src/childhood/PlayWithFriends.tw**
   - Interaction with other children
   - Games that teach survival skills
   - Building relationships
   - Potential conflicts and resolutions

6. **src/childhood/FirstHunt.tw**
   - Observing or participating in a small hunt
   - Learning about animals and tracking
   - Understanding the importance of hunting to the tribe
   - Emotional response to hunting/killing

7. **src/childhood/GatheringExpedition.tw**
   - Joining adults to gather resources
   - Learning about edible plants and materials
   - Danger encounter (snake, getting lost, etc.)
   - Contributing to the tribe's resources

8. **src/childhood/TribalCelebration.tw**
   - Experiencing a seasonal festival or ceremony
   - Learning tribal stories and beliefs
   - Participating in rituals
   - Deepening connection to tribal identity

9. **src/childhood/ChildhoodCrisis.tw**
   - Facing a significant challenge
   - Options for different crisis types:
     - Natural disaster (flood, storm)
     - Injury or illness
     - Conflict with neighboring tribe
     - Food shortage
   - Character development through crisis response

10. **src/childhood/ChildhoodTransition.tw**
    - Preparation for coming-of-age rituals
    - Reflection on childhood experiences
    - Setting intentions for teenage years
    - Transition to next life phase

## Variable System Details

### Basic Needs
```javascript
// Initialize in StoryInit
State.variables.needs = {
    hunger: 20,      // 0-100 scale (0: starving, 100: full)
    thirst: 20,      // 0-100 scale (0: dehydrated, 100: quenched)
    fatigue: 20,     // 0-100 scale (0: exhausted, 100: well-rested)
    health: 80,      // 0-100 scale (0: dying, 100: perfect health)
    maxValues: {
        hunger: 100,
        thirst: 100,
        fatigue: 100,
        health: 100
    }
};

// Function to update needs over time
window.gameUtils.updateNeeds = function(passage) {
    // Different passages affect needs differently
    // Default changes per passage
    State.variables.needs.hunger = Math.max(0, State.variables.needs.hunger - 5);
    State.variables.needs.thirst = Math.max(0, State.variables.needs.thirst - 7);
    State.variables.needs.fatigue = Math.max(0, State.variables.needs.fatigue - 3);
    
    // Check for critical needs
    if (State.variables.needs.hunger <= 0 || State.variables.needs.thirst <= 0) {
        State.variables.needs.health = Math.max(0, State.variables.needs.health - 10);
    }
    
    // Effects based on current needs levels
    // (To be called in PassageHeader)
};
```

### Character Attributes and Skills
```javascript
// Initialize in StoryInit
State.variables.attributes = {
    strength: 3,     // Physical power
    dexterity: 3,    // Agility and coordination
    perception: 3,   // Awareness of surroundings
    wisdom: 3,       // Knowledge and intuition
    charisma: 3      // Social influence
};

State.variables.skills = {
    hunting: 0,      // Tracking and killing animals
    gathering: 0,    // Finding plants and resources
    crafting: 0,     // Making tools and items
    cooking: 0,      // Preparing food
    healing: 0,      // Treating injuries and illness
    storytelling: 0, // Sharing tribal knowledge
    swimming: 0,     // Moving through water
    climbing: 0      // Scaling trees and cliffs
};

// Function for skill checks
window.gameUtils.skillCheck = function(skill, difficulty) {
    // Base chance from skill level (0-100%)
    let chance = State.variables.skills[skill] * 10;
    
    // Modify by relevant attribute
    let relevantAttribute = 0;
    switch(skill) {
        case "hunting":
            relevantAttribute = State.variables.attributes.perception;
            break;
        case "gathering":
            relevantAttribute = State.variables.attributes.wisdom;
            break;
        // etc. for other skills
    }
    
    chance += relevantAttribute * 5;
    
    // Adjust for difficulty (0: very easy, 10: nearly impossible)
    chance -= difficulty * 10;
    
    // Bound between 5% and 95% (always a small chance of success/failure)
    chance = Math.min(95, Math.max(5, chance));
    
    // Return success or failure
    return Math.random() * 100 < chance;
};

// Function to improve skills
window.gameUtils.improveSkill = function(skill, amount) {
    State.variables.skills[skill] += amount;
    // Cap at 10 for childhood
    if (State.variables.lifeStage === "childhood") {
        State.variables.skills[skill] = Math.min(10, State.variables.skills[skill]);
    }
};
```

### Relationships
```javascript
// Initialize in StoryInit
State.variables.relationships = {
    // Family
    "mother": 70,
    "father": 70,
    "sibling1": 60,
    "grandmother": 65,
    "grandfather": 65,
    
    // Other tribe members
    "elderShaman": 50,
    "huntLeader": 50,
    "childFriend1": 50,
    "childRival": 40,
    
    // Will expand as game progresses
};

// Function to change relationship values
window.gameUtils.changeRelationship = function(person, amount) {
    if (State.variables.relationships[person] !== undefined) {
        State.variables.relationships[person] += amount;
        // Keep within 0-100 range
        State.variables.relationships[person] = Math.min(100, Math.max(0, State.variables.relationships[person]));
    }
};
```

### Character Development
```javascript
// Initialize in StoryInit
State.variables.character = {
    name: "",
    gender: "",
    age: 3,
    lifeStage: "childhood",
    traits: [],
    experiences: []
};

// Function to age character
window.gameUtils.ageCharacter = function(years) {
    State.variables.character.age += years;
    
    // Check for life stage transitions
    if (State.variables.character.age >= 13 && State.variables.character.lifeStage === "childhood") {
        State.variables.character.lifeStage = "teenage";
        // Trigger transition passage
    }
    // Other life stage transitions
};

// Function to add traits based on choices
window.gameUtils.addTrait = function(trait) {
    if (!State.variables.character.traits.includes(trait)) {
        State.variables.character.traits.push(trait);
    }
};

// Function to record significant experiences
window.gameUtils.addExperience = function(experience) {
    State.variables.character.experiences.push({
        event: experience,
        age: State.variables.character.age
    });
};
```

### Environmental System
```javascript
// Initialize in StoryInit
State.variables.environment = {
    season: "summer", // spring, summer, fall, winter
    weather: "clear",  // clear, cloudy, rainy, stormy, snowy
    dayTime: "day",    // dawn, day, dusk, night
    location: "camp"   // camp, forest, river, hills, etc.
};

// Function to change season
window.gameUtils.changeSeason = function() {
    const seasons = ["spring", "summer", "fall", "winter"];
    const currentIndex = seasons.indexOf(State.variables.environment.season);
    const nextIndex = (currentIndex + 1) % 4;
    State.variables.environment.season = seasons[nextIndex];
    
    // Season effects on environment and resources
};
```

## UI Elements

### Needs Display
Create a PassageFooter that shows:
- Hunger, thirst, fatigue, and health bars
- Visual indicators that change color based on status
- Simple icons for each need

### Skills and Attributes Display
Create a sidebar widget that shows:
- Current skills with visual representation of level
- Attributes with simple descriptors
- Recent skill improvements highlighted

### Relationship Indicator
Create a widget that can be toggled to show:
- Key relationships with color-coded indicators
- Brief descriptions of how NPCs feel about the player
- Recent relationship changes

### Environmental Display
Create a header widget that shows:
- Current season with appropriate icon
- Weather conditions
- Time of day
- Location name

## Next Steps for Implementation

1. Set up the basic file structure
2. Implement the core variable systems in StoryScript.tw
3. Create the UI elements and styling
4. Develop the Start passage with language/gender selection
5. Implement the childhood introduction passages
6. Build out the remaining childhood passages
7. Test the game flow and mechanics
8. Refine the narrative and choices
9. Prepare for the teenage years phase