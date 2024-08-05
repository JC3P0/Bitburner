/** @param {NS} ns **/
export async function main(ns) {
    // Number of sleeves you have
    const sleeveCount = ns.sleeve.getNumSleeves();

    // Loop through each sleeve and assign tasks
    for (let i = 0; i < sleeveCount; i++) {
        if (i < 4) {
            // Set the first four sleeves to workout at Powerhouse Gym
            switch (i) {
                case 0:
                    ns.sleeve.setToGymWorkout(i, "Powerhouse Gym", "strength");
                    ns.tprint(`Assigned sleeve ${i} to workout strength at Powerhouse Gym`);
                    break;
                case 1:
                    ns.sleeve.setToGymWorkout(i, "Powerhouse Gym", "defense");
                    ns.tprint(`Assigned sleeve ${i} to workout defense at Powerhouse Gym`);
                    break;
                case 2:
                    ns.sleeve.setToGymWorkout(i, "Powerhouse Gym", "dexterity");
                    ns.tprint(`Assigned sleeve ${i} to workout dexterity at Powerhouse Gym`);
                    break;
                case 3:
                    ns.sleeve.setToGymWorkout(i, "Powerhouse Gym", "agility");
                    ns.tprint(`Assigned sleeve ${i} to workout agility at Powerhouse Gym`);
                    break;
            }
        } else if (i === 4) {
            // Set the fifth sleeve to train hacking by taking university course Algorithms
            ns.sleeve.setToUniversityCourse(i, "Rothman University", "Algorithms");
            ns.tprint(`Assigned sleeve ${i} to train hacking by taking Algorithms course at Rothman University`);
        } else if (i === 5) {
            // Set the sixth sleeve to train charisma by taking university course Leadership
            ns.sleeve.setToUniversityCourse(i, "Rothman University", "Leadership");
            ns.tprint(`Assigned sleeve ${i} to train charisma by taking Leadership course at Rothman University`);
        } else {
            // For any additional sleeves, you can assign a default task or leave them unassigned
            ns.tprint(`No specific task assigned to sleeve ${i}`);
        }
    }
}
