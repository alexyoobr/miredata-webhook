-- Add celular, rg and aniversario columns to cnpj table
ALTER TABLE cnpj ADD COLUMN celular TEXT DEFAULT NULL;
ALTER TABLE cnpj ADD COLUMN rg TEXT DEFAULT NULL;
ALTER TABLE cnpj ADD COLUMN aniversario DATE DEFAULT NULL;