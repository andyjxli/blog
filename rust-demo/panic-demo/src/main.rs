use std::fs::File;
use std::io::{self, ErrorKind, Read, Write};

fn two_oldest_ages(ages: &[u8]) -> [u8; 2] {
    let mut result: Vec<u8> = vec![0, 0];
    for &age in ages {
        if age > result[0] {
            if age >= result[1] {
                result[0] = result[1];
                result[1] = age;
            } else {
                result[0] = age;
            }
        }
    }

    [result[0], result[1]]
}

fn file_open() {
    let f = File::open("hello.txt");
    match f {
        Ok(file) => file,
        Err(error) => match error.kind() {
            ErrorKind::NotFound => match File::create("hello.txt") {
                Ok(fc) => fc,
                Err(err) => panic!("Error creating file: {:?}", err),
            },
            error_others => panic!("Error opening the file: {:?}", error_others),
        },
    };

    File::open("hello.txt").unwrap();
    File::open("hello.txt").expect("无法打开文件");
}

fn read_username_from_file() -> Result<String, io::Error> {
    // let f = File::open("hello.txt");

    // let mut f = match f {
    //     Ok(file) => file,
    //     Err(error) => return Err(error),
    // };

    // let mut name = String::new();
    // match f.read_to_string(&mut name) {
    //     Ok(_) => Ok(name),
    //     Err(e) => Err(e),
    // }

    let mut s = String::new();
    File::open("hello.txt")?.read_to_string(&mut s);
    Ok(s)
}

fn write_file() -> io::Result<()> {
    let mut file = File::create("foo.txt")?;
    file.write_all(b"hello world")?;
    Ok(())
}

fn main() {
    assert_eq!(two_oldest_ages(&[1, 5, 87, 45, 8, 8]), [45, 87]);
    assert_eq!(two_oldest_ages(&[6, 5, 83, 5, 3, 18]), [18, 83]);
    assert_eq!(two_oldest_ages(&[10, 1]), [1, 10]);
    assert_eq!(two_oldest_ages(&[1, 3, 10, 0]), [3, 10]);

    // file_open();
    // let f = write_file();
    // println!("{:?}", f);
    // let name = read_username_from_file();
    // println!("filename is {:?}", name)
}
