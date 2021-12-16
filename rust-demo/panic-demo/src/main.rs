use std::fs::File;
use std::io::{self, ErrorKind, Read, Write};

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
    file_open();
    let f = write_file();
    println!("{:?}", f);
    let name = read_username_from_file();
    println!("filename is {:?}", name)
}
