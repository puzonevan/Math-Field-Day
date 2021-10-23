const rules = {
    "capture": "Choose which player starts. This game is played on a 6x6 grid. \
                The main objectuve of the game is to avoid placing your symbol(X or O) \
                in a straight or diagonal course from the opponents. \
                The starting player marks his symbol anywhere on the grid. The next player \
                then add their symbol avoiding a hit described above. The first player can \
                move their symbol anywhere diagonally, horizontally, or vertically to an unused \
                space and shades in their previous mark. The opponent moves similarly. \
                The players continue until there is a winner. The winner is determined \
                either by forcing the opponent to no longer have any more usable spots to move \
                or \" CAPTURES \" the opponent by moving in the straight or diagonal line of \
                the opponent's occupied space.", 

    "five-in-a-row": "Players take turns placing their marks(X or O) in the squares. \
                    The first player to get 5 in a row in any direction is the winner.", 

    "hex": "Players take turns placing their marks (X or O) in the hexagons \
            of their choosing. The winner must form a continous path from their \
            starting side to the opposite side by connecting the hexagons on their edges. \
            The four corners of the hexagon can be considered to be part of either of the \
            sides that they face.", 

    "mancala": "Choose which player starts. The player can choose any hole with beads on \
                their side, scoops up the beads, and distributes them one bead to a hole \
                moving to the right including the end holes. The winner of the game is the \
                first person that gets rid of all the beads on their side. \
                If a player's last bead lands in the end hole, they must go again. \
                If a player's last bead lands in an empty hole on the opponent's side, \
                the player can scoop and move the beads on the opposite hole(on his side) \
                or scoop and place all the beads from the opposite hole to the landed hole. \
                The player can also not move at all when this happens. \
                Whenever a player lands in an empty hole on their side, their turn is over.", 

    "tic-tac-toe-3d": "Players take turns placing their marks(X or O). There are 3 grids that \
                        are each 3x3. The game works similarly to tic tac toe where the winner \
                        is decided by getting 3 marks in a row horizontally, vertically, or \
                        diagonally. However, the winner can also win by getting three in a row \
                        in the same spot of the 3 boards."
}

export { rules };