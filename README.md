# The Best School in Colombia

•	Project description.

Best School in Colombia is a tool that allows you to determine the best schools in the country based on a new ranking generated from 3 formulas:

1.	Tests SABER 11: It is the average of the results of the SABER tests of grades 3, 5, 9 and 11.
2.	ISCE: It is the sum of the result of the Synthetic Index of Educational Quality for primary, secondary and middle.
3.	Level of inclusion: It is the multiplication of students enrolled in grade 11 who did not present the SABER 11 Tests.

The sum of these generates a value (From 1 to 100) that serves to measure the performance of schools covering these three variables, allowing a more real approach to the quality of schools taking into account more variables.

•	What

This dataset was taken from various sources such as the ICFES, the Secretary of Education of Bogotá and the Ministry of National Education. We performed a task of gathering and consolidating this information as well as cleaning it. The availability of this Dataset is static.

Attributes and data types:

1.	ranking: Indicates the position of the school in the ranking generated. Type of attribute:  quantitative, sequential ordering
2.	dane_code: Indicates the unique DANE code assigned to the school. Type of attribute: Ordinal, sequential ordering.
3.	City: Indicates the city where the school is located. Type of attribute: categorical.
4.	Department: Indicates the department where the school is located. Type of attribute: categorical.
5.	School: Name of the school. Type of attribute: categorical.
6.	Sector: Sector to which the school belongs (Official or Private). Type of attribute: categorical.
7.	Calendar: Calendar to which the school belongs (A or B). Type of attribute: categorical.
8.	Matriculados: Number of students enrolled in grade 11 for a given period (2018-I or 2018-II). Type of attribute: quantitative, sequential ordering.
9.	Publicados: Number of students who took the SABER 11 exam for a given period (2018-I or 2018-II). Type of attribute: quantitative, sequential ordering.
10.	Puesto_saber_11: Position that the school occupies in the tests Saber 11 2018 (Including first and second period). Type of attribute: quantitative, sequential ordering.
11.	Promedio_puntaje_global_saber_11: average score obtained by the school in the tests Saber 11. Type of attribute: quantitative, sequential ordering.
12.	Desviación_general: standard deviation obtained by the school in the tests Saber 11. Type of attribute: quantitative, sequential ordering.
13.	Isce_media: score obtained in the synthetic index of educational quality for the courses corresponding to secondary education. Type of attribute: quantitative, sequential ordering.
14.	Isce_secundaria: score obtained in the synthetic index of educational quality for the courses corresponding to secondary education. Type of attribute: quantitative, sequential ordering.
15.	Isce_primaria: score obtained in the synthetic index of educational quality for the courses corresponding to primary education. Type of attribute: quantitative, sequential ordering.
16.	Saber_9_general: average score obtained by the school in the tests Saber 9. Type of attribute: quantitative, sequential ordering.
17.	Saber_5_general: average score obtained by the school in the tests Saber 5. Type of attribute: quantitative, sequential ordering.
18.	Saber_3_general: average score obtained by the school in the tests know 3. Type of attribute: quantitative, sequential ordering.
19.	Formula_1: Value obtained for formula 1 (Promedio_puntaje_global_saber_11 + Saber_9_general + Saber_5_general + Saber_3_general) / 4. Type of attribute: quantitative, sequential ordering.
20.	Formula_2: Value obtained for formula 2 (Isce_media + Isce_secundaria + Isce_primaria) / 3. Type of attribute: quantitative, sequential ordering.
21.	Formula_3: Value obtained for formula 3 (Promedio_puntaje_global_saber_11 * Publicados) + ((Matriculados-Publicados) * (Promedio_puntaje_global_saber_11 -Desviacion_general)) / Matricuados * (Promedio_puntaje_global_saber_11 + Desviación_general). Type of attribute: quantitative, sequential ordering.
22.	Total: Total score obtained by the school in the new ranking (Formula_1 + Formula_2 + Formula_3) / 3 . Type of attribute: quantitative, sequential ordering.
23.	Ranking_dinero: Average score obtained by each school in the ranking of the Dinero magazine. Type of attribute: quantitative, sequential ordering.

•	Why

The following tasks were defined:

Main tasks:

1.	Summarize the distribution of the best schools in Colombia, from the generation of a new ranking (Summarize - Distribution).
2.	Compare the result for each of the formulas of the new ranking of schools according to the filter made by the user. (Compare – Features)
3.	Compare the result of the new ranking with that obtained by the money magazine based on the scores obtained by each in the SABER 11 tests (Compare - Distribution).

Secondary tasks:

1.	Calculate the total score for each defined formula of the new ranking by School (Derive - Features).
2.	Derive the position of each school in the new ranking (Derive - Features).
3.	Determine the difference between students enrolled / registered by each school and those evaluated to identify if this influences the results obtained (Derive - Trends).

•	How

1.	Summarize the distribution of the best schools in Colombia, from the generation of a new ranking (Summarize - Distribution).

Mark: Line
Channels: hue  - parts of the ranking
Idiom: Horizont Bar Chart
Encode: Express
Manipulate: Select 
Reduce: Filter

Insights:

•	The schools with the best performance in the new index are mostly private schools located in Bogotá, Tunja, Cali, La Calera, Sopo, Floridablanca, Envigado, Chía, Ibagué and Pamplona.
•	There are only 2 official schools in the top 100, 10 schools in the top 500 and 47 in the top 1000.
•	There is a higher number of Calendar B colleges in the top 50.

2.	Compare the result for each of the formulas of the new ranking of schools according to the filter made by the user. (Compare – Features)

Mark: Line
Idiom: Parallel coordinates
Encode: Express 
Map: Hue, Luminance.
Manipulate: Change
Reduce: Filter
Facet: SuperImpose
Channel: Vertical position, Color Hue

Insights:

•	In the three new formulas the performance of the best schools is significantly higher than the average of the country.
•	The best schools have a higher level of inclusion and better test results than others. For the synthetic index the majority is between 70% and 90%, finding that the difference is made in the inclusion level and the results of the tests.

3.	Compare the result of the new ranking with that obtained by the money magazine based on the scores obtained by each in the SABER 11 tests (Compare - Distribution).

Mark: Line  
Channel: hue  - ranking / revista Dinero   
Idiom: Group Bar Chart  
Encode: Separate Order and Align  
Manipulate: Select – Shows detail of the name and ranking of the School  
Reduce: Filter  

Insights:

•	The ranking is higher for all schools than that obtained in the magazine Dinero, but the order does change considerably.

•	Class website

http://johnguerra.co/classes/visual_analytics_fall_2018/


•	Paper


•	Project's demo

Spanish version: https://prismapar.github.io/best_school_es/index.html      
English version: https://prismapar.github.io/best_school_en/index.html

•	How to run it

Spanish version: https://prismapar.github.io/best_school_es/index.html      
English version: https://prismapar.github.io/best_school_en/index.html

