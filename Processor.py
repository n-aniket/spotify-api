with open('genreList.txt', 'r') as f:
    lines = f.readlines()

# remove spaces
lines = [line.replace(' ', '%20') for line in lines]

# finally, write lines in the file
with open('genreList_processed.txt', 'w') as f:
    f.writelines(lines)
