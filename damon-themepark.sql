-- Damon Simpkinson
-- CS313 week 10-13 NodeJS project

-- conditionally drop table
DROP TABLE IF EXISTS themepark CASCADE;

-- create the table
CREATE TABLE themepark
( themepark_id               SERIAL         PRIMARY KEY
, themepark_name             VARCHAR        NOT NULL
, themepark_display_name     VARCHAR(30)    NOT NULL
, themepark_city             VARCHAR(30)    NOT NULL
, themepark_state_province   VARCHAR(20)    NOT NULL
, themepark_country          VARCHAR(20)    NOT NULL);


-- conditionally drop table
DROP TABLE IF EXISTS attraction CASCADE;

-- create the table
CREATE TABLE attraction
( attraction_id              SERIAL         PRIMARY KEY
, themepark_location         INTEGER        NOT NULL REFERENCES themepark(themepark_id)
, attraction_name            VARCHAR(60)    NOT NULL);

-- Seed themepark table
INSERT INTO themepark
( themepark_name
, themepark_display_name
, themepark_city
, themepark_state_province
, themepark_country)
VALUES
( 'WaltDisneyWorldMagicKingdom'
, 'Magic Kingdom'
, 'Orlando'
, 'Florida'
, 'United States')
,
( 'WaltDisneyWorldHollywoodStudios'
, 'Hollywood Studios'
, 'Orlando'
, 'Florida'
, 'United States')
,
( 'WaltDisneyWorldEpcot'
, 'EPCOT'
, 'Orlando'
, 'Florida'
, 'United States')
,
( 'WaltDisneyWorldAnimalKingdom'
, 'Animal Kingdom'
, 'Orlando'
, 'Florida'
, 'United States');

-- Seed attraction table
INSERT INTO attraction
( themepark_location
, attraction_name)
VALUES
( (SELECT themepark_id FROM themepark
   WHERE themepark_name = 'WaltDisneyWorldMagicKingdom')
, 'Haunted Mansion')
,
( (SELECT themepark_id FROM themepark
   WHERE themepark_name = 'WaltDisneyWorldMagicKingdom')
, 'Splash Mountain')
,
( (SELECT themepark_id FROM themepark
   WHERE themepark_name = 'WaltDisneyWorldMagicKingdom')
, 'Space Mountain')
,
( (SELECT themepark_id FROM themepark
   WHERE themepark_name = 'WaltDisneyWorldMagicKingdom')
, 'The Barnstormer')
,
( (SELECT themepark_id FROM themepark
   WHERE themepark_name = 'WaltDisneyWorldMagicKingdom')
, 'Seven Dwarfs Mine Train')
,
( (SELECT themepark_id FROM themepark
   WHERE themepark_name = 'WaltDisneyWorldAnimalKingdom')
, 'Expedition Everest - Legend of the Forbidden Mountain')
,
( (SELECT themepark_id FROM themepark
   WHERE themepark_name = 'WaltDisneyWorldAnimalKingdom')
, E'Na\'vi River Journey')
,
( (SELECT themepark_id FROM themepark
   WHERE themepark_name = 'WaltDisneyWorldAnimalKingdom')
, 'Avatar Flight of Passage')
,
( (SELECT themepark_id FROM themepark
   WHERE themepark_name = 'WaltDisneyWorldAnimalKingdom')
, 'DINOSAUR')
,
( (SELECT themepark_id FROM themepark
   WHERE themepark_name = 'WaltDisneyWorldAnimalKingdom')
, 'Kali River Rapids')
,
( (SELECT themepark_id FROM themepark
   WHERE themepark_name = 'WaltDisneyWorldAnimalKingdom')
, E'It\'s Tough to be a Bug!')
,
( (SELECT themepark_id FROM themepark
   WHERE themepark_name = 'WaltDisneyWorldHollywoodStudios')
, E'Rock \'n\' Roller Coaster Starring Aerosmith')
,
( (SELECT themepark_id FROM themepark
   WHERE themepark_name = 'WaltDisneyWorldHollywoodStudios')
, 'Star Tours - The Adventures Continue')
,
( (SELECT themepark_id FROM themepark
   WHERE themepark_name = 'WaltDisneyWorldHollywoodStudios')
, 'The Twilight Zone Tower of Terror')
,
( (SELECT themepark_id FROM themepark
   WHERE themepark_name = 'WaltDisneyWorldHollywoodStudios')
, 'Toy Story Mania!')
,
( (SELECT themepark_id FROM themepark
   WHERE themepark_name = 'WaltDisneyWorldEpcot')
, E'Soarin\' Around the World')
,
( (SELECT themepark_id FROM themepark
   WHERE themepark_name = 'WaltDisneyWorldEpcot')
, 'Turtle Talk With Crush')
,
( (SELECT themepark_id FROM themepark
   WHERE themepark_name = 'WaltDisneyWorldEpcot')
, 'Mission: SPACE')
,
( (SELECT themepark_id FROM themepark
   WHERE themepark_name = 'WaltDisneyWorldEpcot')
, 'Test Track')
,
( (SELECT themepark_id FROM themepark
   WHERE themepark_name = 'WaltDisneyWorldEpcot')
, 'Spaceship Earth');
